from sikuli import *
import imports
reload(imports)
imports.addSikuliImagePath(lambda:0)

import openVSRTC
reload(openVSRTC)

openVSRTC.run()

def run():
    if exists("1509391227991.png", 5) != None:
        click("1509391257921.png")
        wait("1509390838084.png", 3)
        click(Pattern("1509390838084.png").targetOffset(-250,57))
        wait("1509390891036.png")