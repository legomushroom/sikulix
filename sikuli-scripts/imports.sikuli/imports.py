import os

from sikuli import *

from inspect import getsourcefile


def addSikuliImagePath(path):
    addImagePath(os.path.dirname(os.path.abspath(getsourcefile(path))))