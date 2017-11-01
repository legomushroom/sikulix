from sikuli import *
import imports
reload(imports)
imports.addSikuliImagePath(lambda:0)

import constants
reload(constants)

def run():
    openApp('VSRTC')
    wait("1509469188117.png", 5)

    if exists("1509469733128.png", 5) != None:
        click("1509469753756.png")
        wait("1509469792600.png")
        click("1509469792600.png")

    else: 
        wait("1509469272487.png", 5)
        click("1509469272487.png")

    wait("1509469305458.png", 5)
    
    return Env.getClipboard()