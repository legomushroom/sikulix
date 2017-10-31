import os
import time

import imports
reload(imports)
imports.addSikuliImagePath(lambda:0)

import constants
reload(constants)

def run():
    openApp('VSRTC')
    wait("1509466438747.png", 5)
    type('`', KEY_CTRL)

    wait("1509466568621.png", 3)
    click("1509466580108.png")
    if exists("1509466596583.png") == None:
        click("1509466596583.png")
        type('Visual Studio RTC')
        type(Key.ENTER)

    hover(Env.getMouseLocation().offset(0, 40))
    mouseDown(Button.LEFT)
    mouseUp()

    # copy to clipboard
    type('a', KEY_CMD)
    type('c', KEY_CMD)

    time.sleep(2)

    output = Env.getClipboard()

    # Devtools output:
  
    click(Pattern("1509467061897.png").similar(0.52))
    wait("1509467094931.png")
    click("1509467094931.png")
    wait("1509468746576.png", 5)

    hover(Pattern("1509468746576.png").targetOffset(-26,27))
    
    mouseDown(Button.LEFT)
    mouseMove(Env.getMouseLocation().offset(0, 25)) 
    mouseUp()

    type('a', KEY_CMD)

    time.sleep(2)
    
    type('c', KEY_CMD)

    time.sleep(2)

    devtoolsOutput = Env.getClipboard()
    
    click(Pattern("1509467201304.png").targetOffset(-20,-15))

    print(">>> Error report")
    print(" >> Output: ")
    print(output)
    print(" >> Devtools log: ")
    print(devtoolsOutput)

run()
