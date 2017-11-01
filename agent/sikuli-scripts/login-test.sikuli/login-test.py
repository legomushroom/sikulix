import os

from sikuli import *
import imports
reload(imports)
imports.addSikuliImagePath(lambda:0)

import login
reload(login)

import constants
reload(constants)

import reportError
reload(reportError)

import getSessionLink
reload(getSessionLink)

login.run(os.environ['SIKULI_VSRTC_PROVIDER'] == 'MICROSOFT')

if exists("1509471343316.png", 5) != None or exists("1509471444322.png") != None:
    reportError.run()
else:
    #sessionLink = getSessionLink.run()
    #print(constants.OUTPUT_MARKER + ' : data : ' + sessionLink)
    print(constants.OUTPUT_MARKER + ' : status : OK')