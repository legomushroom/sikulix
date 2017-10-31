import os
import time

from sikuli import *

import logout
reload(logout)

import constants
reload(constants)

import reportError
reload(reportError)

import imports
reload(imports)

imports.run()
logout.run()

wait("1509389845775.png", 5)

click("1509389845775.png", 5)

wait("1509038007391.png")

click(Pattern("1509038017899.png").targetOffset(476,-4))


wait("1509038079595.png", 5)

if 1 == 2:
    #if os.environ['SIKULI_VSRTC_PROVIDER'] == 'MICROSOFT':
  click(Pattern("1509038087903.png").targetOffset(-108,36))

  wait("1509038218664.png", 5)
  click(Pattern("1509038226289.png").targetOffset(-54,-47))

else:
  click(Pattern("1509038087903.png").targetOffset(114,45))

wait("1509038267275.png", 5)

type("w", KEY_CMD)

switchApp('VSRTC')
if exists("1509038546095.png", 5) != None or exists("1509051410195.png") != None:
    reportError.run()
   
else:
    print(constants.OUTPUT_MARKER + ' : data : https://ci.dev.project-cascade.visualstudio.com/join?A034FD644EA4CDB3DAAC')
    print(constants.OUTPUT_MARKER + ' : status : OK')



