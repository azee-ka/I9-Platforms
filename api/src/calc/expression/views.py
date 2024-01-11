# views.py
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Expression
from ...userHistory.models import UserHistory
from .serializers import ExpressionSerializer
from ..evaluate.evaluate import evaluate

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def submit_expression(request):
    serializer = ExpressionSerializer(data=request.data)

    if serializer.is_valid():
        user = request.user if request.user.is_authenticated else None
        serializer.validated_data['user'] = user
        expression_instance = serializer.save()

        # Evaluate the expression and get the result
        result = evaluate(expression_instance.expression, oper='tex', mode='plain')
        
        # Check if 'output' is not None before saving to history and the serialized data
        if result['output'] is not None:
            # Save to history automatically
            if user:
                UserHistory.objects.create(
                    user=user,
                    expression=expression_instance.expression,
                    result=result['output'],  # Assuming 'output' contains the result
                )

        # Add the result to the serialized data
        serialized_data = ExpressionSerializer(expression_instance).data
        serialized_data['result'] = result

        return Response(serialized_data, status=201)

    return Response(serializer.errors, status=400)
