import sympy as sp
from latex2sympy2 import latex2sympy

class Expression:
    def __init__(self, latex, mode):
        self.latex = latex
        self.sympy_expr = latex2sympy(self.latex)
        self.mode = mode


    def get_sympy_expr(self):
        return self.sympy_expr


    def get_user_expr_latex(self):
        user_expr = sp.latex(self.sympy_expr)
        if self.has_trig_input():
            user_expr =  (self.add_deg_symbol_for_trig(user_expr))
        return user_expr



    def has_trig_input(self):
        expr = self.sympy_expr
        trig_functions = [sp.sin, sp.cos, sp.tan, sp.cot, sp.sec, sp.csc]
        #for func in trig_functions:
        #     if any(isinstance(atom, func) for atom in expr.atoms(sp.Function)):
        #         return True
        return False


        
    def add_deg_symbol_for_trig(self, latex_input):
        if self.mode == "degree":
            # Define a regular expression pattern to match trig functions like \sin, \cos, etc.
            trig_function_pattern = r'\\(sin|cos|tan|csc|sec|cot)'

            # Use regular expression to find and replace the closing parenthesis with a degree sign
            modified_input = re.sub(trig_function_pattern + r'(\\([^)]+\\))', r'\\^\\circ)', latex_input)

            return modified_input
        return latex_input 
            


    def has_atrig_functions(expr):
        trig_functions = [sp.asin, sp.acos, sp.atan, sp.acot, sp.asec,sp.acsc]
        for func in trig_functions:
            try:
                if not isinstance(expr, str):
                    if expr.has(func):
                        return True
                expr = sp.sympify(expr)
                if any(isinstance(atom, func) for atom in expr.atoms(sp.Function)):
                    return True
            except:
                pass
        return False
    

    def is_numerical(self, output):
        try:
            return not (output).has(sp.Symbol)
        except:
            return False


    def is_exact(self, output):
        if self.is_decimal(output) is not None and self.is_numerical(output):
            # Check if the decimal number is exact
            decimal_str = str(sp.N(self.is_decimal(output), 30))
            check_exact = decimal_str.endswith('0' * 13)
            if not check_exact:
                decimal_str = str(round(self.is_decimal(output), 30))
                check_exact = decimal_str.endswith('0' * 13)
            if not check_exact and "e" in decimal_str:
                decimal_str = re.sub(r'e.*', '', decimal_str)
                check_exact = decimal_str.endswith('0' * 13)
            
            return check_exact
        return False



    def is_integer(self):
        if isinstance(self.sympy_expr, sp.Integer):
            return True
        return False    

        
    def is_decimal(self, sympy_expr):
        decimal = None
        try:
            if not isinstance(sympy_expr, sp.Expr) or self.is_numerical(sympy_expr):
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
            decimal = process_for_decimal(decimal, sympy_expr)

        if decimal is not None and sp.latex(sympy_expr) == process_for_decimal(decimal, sympy_expr) or len(str(decimal)) == 0:
            decimal = None

        return decimal




import re

def process_for_decimal(sympy_expr, decimal):
    # Attempt to evaluate the expression as a decimal
    if sympy_expr is not None:
        try:
            decimal_rounded = round(sympy_expr, 25)
            decimal_str = (sp.latex(decimal_rounded))
            if not decimal_str == "0":
            # Use regular expression to remove trailing zeros and the decimal point
                decimal_str = re.sub(r'(\.0*|0*)$', '', decimal_str)
            return decimal_str
        except:
            return sp.latex(decimal)
    else:
        return sp.latex(decimal)