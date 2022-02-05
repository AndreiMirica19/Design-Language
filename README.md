# Design-Language
The goal of the assignment is to write an interpreter for the Design language. The language is used to draw geometric figures and points.


The program receives two parameters:

the file with the instructions

the svg output file

node main.js design.dsn canvas.svg
This will run the design.dsn file and write the design to the canvas.svg file.

Initial values

The initial position is 0, 0.
The initial color of the pen is black.
The initial fill color is white.
The width of the pen is 1.

Comments are preceded by &

All instructions accept numbers or variables as parameters. Variables have the following format:

%variable
Before it can be used, a variable must be given a value (using the set statement).

Instruction format

The instructions are stored in a file. Each statement is on a separate line.

The format of an instruction is as follows:

   INSTRUCTION: parameter1 parameter2 etc
Statements can have any number of spaces before their name, between parameters, and any number of spaces after the last parameter. Here are some examples of valid statements:

   INSTRUCTION: p1 p2   p3
       INSTRUCTION: p1  p2 p3
   INSTRUCTION:   p1 p2 p3
All statements and parameters are case insensitive.

Instructions

POSITION

Moves the pen to a position, without drawing anything.

The parameters are x and y.

Errors

Wrong number of parameters:

ERROR LINE (line_number):POSITION has 2 parameters, you wrote (number_of_written_parameters)

Wrong parameter type:

ERROR LINE (line_number): POSITION parameter (the number of the parameter) requires a number

LINE

Draws a line from the current position to another position or with a specified length and angle. This will be the new pen position.

Syntaxe

LINE: x y location
LINE: l a polar

Parameters

It takes exactly three parameters

type - either position or polar
x - if type is location, the x coordinate of the new position
y - if type is location, the y coordinate of the new position
l - if type is polar, the length of the line
a - if type is polar, the angle (of trigonometric circle) in degrees

Errors

Wrong number of parameters:

ERROR LINE (line_number):LINE has 3 parameters, you wrote (number_of_written_parameters)
Wrong parameter type for type:

ERROR LINE (line_number): LINE parameter 3 requires one of (position, polar), you wrote (actual_written_parameter_value)
Bad parameter type:

ERROR LINE (line_number): LINE parameter (the number of the parameter) requires a number or a variable, you wrote (actual_written_parameter_value)

CIRCLE

Draw a circle

It does not move the current position.

Syntax

CIRCLE: x y r
Parameters

You need exactly three parameters

x - the x coordinate for the center
y - the y coordinate for the center
r - the radius
Errors

Wrong number of parameters:

ERROR LINE (line_number): CIRCLE has 3 parameters, you wrote (number_of_written_parameters)
Bad parameter type:

ERROR LINE (line_number): CIRCLE parameter (the number of the parameter) requires a number or a variable, you wrote (actual_written_parameter_value)


ELLIPSE

Draw an ellipse

It does not move the current position.

Syntax

ELLIPSE: x y r1 r2
Parameters

It takes exactly four parameters

x - the x coordinate for the center
y - the y coordinate for the center
r1 - the horizontal radius
r2 - the vertical radius
Errors

Wrong number of parameters:

ERROR LINE (line_number): ELLIPSE has 3 parameters, you wrote (number_of_written_parameters)
Bad parameter type:

ERROR LINE (line_number): ELLIPSE parameter (the number of the parameter) requires a number or a variable, you wrote (actual_written_parameter_value)

Draw a rectangle

It does not move the current position.

Syntax

RECTANGULAR: x1 y1 x2 y2
Parameters

It takes exactly four parameters

x1 - the x coordinate of the top left corner
y1 - the y coordinate of the top left corner
x2 - the x coordinate of the lower right corner
y2 - the y coordinate of the lower right corner
Errors

Wrong number of parameters:

ERROR LINE (line_number): RECTANGLE has 4 parameters, you wrote (number_of_written_parameters)
Bad parameter type:

ERROR LINE (line_number): RECTANGLE parameter (the number of the parameter) requires a number or a variable, you wrote (actual_written_parameter_value)



clear

volume_up
1,146 / 5,000
Translation results
COLOR

Select the drawing color.

The initial color of the pen is black. The initial fill color is white.

Syntax

COLOR: pen r g b
COLOR: fill r g b
Parameters

It takes exactly four parameters

type - either pen (the color of the line) fill (the color inside)
r - the red component of the color
g - the green component of the color
b - the blue component of the color
Values range from 0 to 255.

Errors

Wrong number of parameters:

ERROR LINE (line_number):COLOR has 4 parameters, you wrote (number_of_written_parameters)
Parameter type wrong for type

ERROR LINE (line_number): COLOR parameter 1 requires one of (pen, fill), you wrote (actual_written_parameter_value)
Bad parameter type:

ERROR LINE (line_number): COLOR parameter (the number of the parameter) requires a number or a variable, you wrote (actual_written_parameter_value)
Value out of range:

ERROR LINE (line_number): COLOR parameter (the number of the parameter) requires a number or a variable between [0, 255], you wrote (actual_written_parameter_value, if it is a variable write the value of the variable) 


LOOPS

Repeats certain lines of declarations until REPEAT

LOOP: times
LOOP statements are not nested (LOOP within LOOP)

Parameters

It takes exactly one parameter

* times - an integer or a variable specifying the number of times statements are repeated until REPEAT

Errors

Wrong number of parameters:

ERROR LINE (line_number): LOOP has 1 parameters, you wrote (number_of_written_parameters)
Wrong parameter for times:

ERROR LINE (line_number): LOOP parameter 1 requires a number or a variable, you wrote (actual_written_parameter_value)
The file ends and there is still at least one loop without REPEAT:

ERROR LINE (line_number): LOOP with no REPEAT


WHILE

Repeats certain lines of declarations until REPEAT

WHILE: variable
WHILE statements are not nested (WHILE within WHILE)

Parameters

It takes exactly one parameter

* variable - a variable, if the variable is different from 0, repeat the instructions until REPEAT, one or more times

Errors

Wrong number of parameters:

ERROR LINE (line_number): WHILE has 1 parameters, you wrote (number_of_written_parameters)
Wrong parameter for variable:

ERROR LINE (line_number): WHILE parameter 1 requires a variable, you wrote (actual_written_parameter_value)
The file ends and there is still at least one WHILE without REPEAT:

ERROR LINE (line_number): WHILE with no REPEAT


REPEAT

End a LOOP or a WHILE.

Settings

It doesn't take parameters:

Errors

Wrong number of parameters:

ERROR LINE (line_number): REPEAT has 0 parameters, you wrote (number_of_written_parameters)
REPEAT is used without a preceding LOOP:

ERROR LINE (line_number): REPEAT and no LOOP


IF

Execute certain lines of instructions until ELSE or END

IF: variable
IF statements are not nested (IF in IF)

Parameters

It takes exactly one parameter

* variable - a variable, if the variable is different from 0, execute the instructions until ELSE or END (if there is no ELSE)

Errors

Wrong number of parameters:

ERROR LINE (line_number): IF has 1 parameters, you wrote (number_of_written_parameters)
Wrong parameter for times

ERROR LINE (line_number): IF parameter 1 requires a variable, you wrote (actual_written_parameter_value)
The file ends and there is still at least one IF without END

You have number_of_repeats IF without END


ELSE

ELSE is part of the IF

Parameters

It does not take parameters

Errors

Wrong number of parameters:

ERROR LINE (line_number): ELSE has 0 parameters, you wrote (number_of_written_parameters)
END is used without a preceding IF:

ERROR LINE (line_number): ELSE and no IF


END

End an IF

Parameters

It does not take parameters

Errors

Wrong number of parameters:

ERROR LINE (line_number): END has 0 parameters, you wrote (number_of_written_parameters)
END is used without a preceding IF:

ERROR LINE (line_number): END and no IF


SET

Set the value of a variable

SET: variable value
Parameters

You need exactly two parameters

variable - a variable
value - the value, can be a number or another variable
Errors

Wrong number of parameters:

ERROR LINE (line_number): SET has 2 parameters, you wrote (number_of_written_parameters)
Wrong parameter for variable

ERROR LINE (line_number): SET parameter 1 requires a variable, you wrote (actual_written_parameter_value)
Wrong parameter for value

ERROR LINE (line_number): SET parameter 2 requires a number or a variable, you wrote (actual_written_parameter_value)


ADD

Add a value to the value of a variable

ADD: variable value
Parameters

You need exactly two parameters

variable - a variable
value - the value to add, can be a number or another variable
Errors

Wrong number of parameters:

ERROR LINE (line_number): ADD has 2 parameters, you wrote (number_of_written_parameters)
Wrong parameter type for variable

ERROR LINE (line_number): ADD parameter 1 requires a variable, you wrote (actual_written_parameter_value)
Wrong parameter type for value:

ERROR LINE (line_number): ADD parameter 2 requires a number or a variable, you wrote (actual_written_parameter_value)


SUB

Subtract a value from the value of a variable

SUB: variable value
Parameters

You need exactly two parameters

variable - a variable
value - the value to subtract, can be a number or another variable
Errors

Wrong number of parameters:

ERROR LINE (line_number): SUB has 2 parameters, you wrote (number_of_written_parameters)
Wrong parameter type for variable

ERROR LINE (line_number): SUB parameter 1 requires a variable, you wrote (actual_written_parameter_value)
Wrong parameter type for value

ERROR LINE (line_number): SUB parameter 2 requires a number or a variable, you wrote (actual_written_parameter_value


MUL

Multiply the value of a variable by a value.

MUL: variable value
Settings

You need exactly two parameters

variable - a variable
value - the value to multiply with, can be a number or another variable
Errors

Wrong number of parameters

ERROR LINE (line_number): MUL has 2 parameters, you wrote (number_of_written_parameters)
Wrong parameter type for variable

ERROR LINE (line_number): MUL parameter 1 requires a variable, you wrote (actual_written_parameter_value)
Wrong parameter type for value

ERROR LINE (line_number): MUL parameter 2 requires a number or a variable, you wrote (actual_written_parameter_value)

DIV

Divide the value of a variable by a value

DIV: variable value
Parameters

You need exactly two parameters

variable - a variable
value - the value with which to divide the value of the variable, can be a number or another variable
Errors

Wrong number of parameters

ERROR LINE (line_number): DIV has 2 parameters, you wrote (number_of_written_parameters)
Wrong parameter type for variable

ERROR LINE (line_number): DIV parameter 1 requires a variable, you wrote (actual_written_parameter_value)
Wrong parameter type for value

ERROR LINE (line_number): DIV parameter 2 requires a number or a variable, you wrote (actual_written_parameter_value)

IVDD

Divide the value of a variable by a value (integer value)

IDIV: variable value
Parameters

You need exactly two parameters

variable - a variable
value - the value with which to divide the value of the variable, can be a number or another variable
Errors

Wrong number of parameters

ERROR LINE (line_number): IDIV has 2 parameters, you wrote (number_of_written_parameters)
Wrong parameter type for variable

ERROR LINE (line_number): IDIV parameter 1 requires a variable, you wrote (actual_written_parameter_value)
Wrong parameter type for value

ERROR LINE (line_number): IDIV parameter 2 requires a number or a variable, you wrote (actual_written_parameter_value


MOD

The remainder of dividing a variable with a value

MOD: variable value
Parameters

You need exactly two parameters

variable - a variable
value - the value with which to divide the value of the variable, can be a number or another variable
Errors

Wrong number of parameters:

ERROR LINE (line_number): MOD has 2 parameters, you wrote (number_of_written_parameters)
Wrong parameter type for variable

ERROR LINE (line_number): MOD parameter 1 requires a variable, you wrote (actual_written_parameter_value)
Wrong parameter type for value

ERROR LINE (line_number): MOD parameter 2 requires a number or a variable, you wrote (actual_written_parameter_value)


