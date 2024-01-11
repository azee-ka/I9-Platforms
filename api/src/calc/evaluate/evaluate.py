import sympy as sp
import re
from sympy import *
from latex2sympy2 import latex2latex, latex2sympy
#from sympy.parsing.latex import latex2sympy

from .expression import Expression, process_for_decimal


def evaluate(latex, oper, mode):
    try:
        latex = filter_input(latex)
        expression = Expression(latex, mode)
        
        output = preform_operation(latex, mode)
        
        
        user_expr = str(expression.get_user_expr_latex())
        
        decimal = expression.is_decimal(output)
        is_exact = expression.is_exact(output)
        is_integer = expression.is_integer()           

        
        if not decimal is None:
            decimal = str(sp.latex(decimal))

        output = sp.latex(output)

        if output == user_expr:
            user_expr = latex
            
        output_copy_latex = output
        output = process_for_equations(output)

        if output == output_copy_latex:
            output = str(output)
            
        if isinstance(output, list):
            decimal = convert_equations_to_decimal(output)
            if ",".join(map(str, output)) == ",".join(map(str, decimal)):
                decimal = None

        result = {
            'output': output,
            'userExpr': latex,
            'decimal': decimal,
            'isInteger': is_integer,
            'isExact': is_exact,
        }
    except (Exception, AttributeError, ArithmeticError) as e:
        result = {
            'output': None,
            'userExpr': latex,
            'decimal': None,
            'isInteger': False,
            'isExact': False,
        }
        
    return result 


def filter_input(latex):
    strings_to_replace = ["!","@", "#", "$", "%","&"]
    for s in strings_to_replace:
        if s in latex:
            latex = latex.replace(s, "")
    return latex


def preform_operation(latex, mode):
    # sympy_input = latex2sympy(latex)
    try:
        sympy_input = latex2sympy(latex)
        sympy_expr = sp.simplify(sympy_input.doit())
        return sympy_expr
    except (AttributeError, Exception, SyntaxError) as e:
        print(f'Error during Opertaion Performing: {e}')
    return sympy_input


import re

def process_for_equations(latex):
    # Example LaTeX string
    latex_equations_str = latex

    # Define a regular expression pattern to match each equation within square brackets
    equation_pattern = r'\\left\[(.*?)\\right\]'

    # Find matches in the LaTeX string
    equation_matches = re.search(equation_pattern, latex_equations_str)

    # Initialize an array to store the equations
    equations = []

    # Check if there is a match
    if equation_matches:
        # Get the content inside the square brackets
        equations_content = equation_matches.group(1)

        # Split the content using commas as the delimiter, considering the space after the comma
        equation_parts = [part.strip() for part in re.split(r',\s*\\', equations_content)]

        # Add each equation to the array
        equations.extend(equation_parts)

        # Output the array of equations
        return equations
    else:
        return latex
    
import copy

def convert_equations_to_decimal(output):
    # Iterate through each equation in the array
    equations = copy.deepcopy(output)
    for i in range(len(equations)):
        # Use a regular expression to extract the right-hand side of the equation
        match = re.match(r'^\s*(\w+)\s*=\s*(.*?)\s*$', equations[i])

        if match:
            variable, equation = match.groups()
            # Call to_decimal function on the expression
            try:
                decimal_expression = to_decimal(latex2sympy(equation))
            except (Exception, AttributeError) as e:
                print(f'Error while converting to decimal: {e}')
                decimal_expression = equation

            # Replace the original expression in the array with its decimal form
            equations[i] = f'{variable} = {decimal_expression}'

    return equations


def to_decimal(sympy_expr):
        decimal = ((sp.simplify(sympy_expr))).evalf(5)
        try:
            if not isinstance(sympy_expr, sp.Expr):
                decimal = sp.N(sympy_expr)
        except:
            try:
                if isinstance(sympy_expr, list):
                    decimal = [sp.Eq(eq.lhs, sp.N(eq.rhs)) if isinstance(eq, sp.Eq) else eq for eq in sympy_expr]
                elif isinstance(sympy_expr, sp.Eq):
                    decimal = sp.Eq(sympy_expr.lhs, sp.N(sympy_expr.rhs))
            except (TypeError, ValueError, sp.SympifyError):
                pass

        if decimal is not None and sp.latex(sympy_expr) == str(sp.latex(decimal)):
            decimal = process_for_decimal(sympy_expr, decimal)

        decimal = process_for_decimal(sympy_expr, decimal)
        return decimal
