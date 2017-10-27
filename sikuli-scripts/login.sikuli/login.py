import os
import time

openApp('VSRTC');

wait("1509041290428.png", 5)

# Log out
if exists("1509047312623.png", 3) != None:
  click("1509047476268.png")
  wait(Pattern("1509047757756.png").targetOffset(-243,52))

  click(Pattern("1509047757756.png").targetOffset(-243,52))
  
  wait(Pattern("1509041325992.png").similar(0.95))

# Log in

openApp('VSRTC');

click(Pattern("1509041325992.png").similar(0.95))

wait("1509038007391.png")

click(Pattern("1509038017899.png").targetOffset(476,-4))


wait("1509038079595.png", 5)

if os.environ['SIKULI_VSRTC_PROVIDER'] == 'MICROSOFT':
  click(Pattern("1509038087903.png").targetOffset(-108,36))

  wait("1509038218664.png", 5)
  click(Pattern("1509038226289.png").targetOffset(-54,-47))

else:
  click(Pattern("1509038087903.png").targetOffset(114,45))

wait("1509038267275.png", 5)

type("w", KEY_CMD)

switchApp('VSRTC')

if exists("1509038546095.png", 5) == None or exists("1509051410195.png") != None:
    
    type("`", KEY_CTRL)
    
    wait("1509042668993.png")
    click(Pattern("1509042677628.png").targetOffset(-69,2))
    wait("1509042707742.png")

    if exists(Pattern("1509048234712.png").similar(0.92)) == None:
   
      click("1509042714685.png")
    
      type('Visual Studio RTC')
    
      type(Key.ENTER)

    hover(Env.getMouseLocation().offset(0, 40))
    mouseDown(Button.LEFT)
    mouseUp()

    type('a', KEY_CMD)
    type('c', KEY_CMD)

    time.sleep(2)

    output = Env.getClipboard()

    # Devtools output:

    wait(Pattern("help_1509047312623.png").similar(0.91), 5)

    click(Pattern("help_1509047312623.png").similar(0.91))

    wait(Pattern("help-menu.png").similar(0.91), 5)

    click(Pattern("help-menu.png").similar(0.91).targetOffset(-69,53))

    wait("1509052779872.png", 5)

    hover(Pattern("1509052822091.png").targetOffset(-2,30))

    mouseDown(Button.LEFT)
    mouseMove(Env.getMouseLocation().offset(0, 25)) 
    mouseUp()

    type('a', KEY_CMD)

    time.sleep(2)
    
    type('c', KEY_CMD)

    time.sleep(2)

    devtoolsOutput = Env.getClipboard()
    click(Pattern("1509057168419.png").targetOffset(-23,-29))
    
    print(">>> SignIn failed")
    print(" >> output: ")
    print(output)
    print(" >> devtools output: ")
    print(devtoolsOutput)
    
else:
    print('OK')




