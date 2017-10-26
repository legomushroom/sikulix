# import os
# os.system('open "https://devdiv.visualstudio.com/DevDiv/Project%20Cascade/_build/index?definitionId=7549&_a=completed"')

run('open "https://devdiv.visualstudio.com/DevDiv/Project Cascade/_build/index?definitionId=7549&_a=completed"')

wait("1509036486448.png", 10)


click(Pattern("1509036507333.png").targetOffset(-354,51))

wait("1509036571802.png", 5)

click(Pattern("1509036584298.png").targetOffset(72,-8))

wait("1509036633221.png")
click(Pattern("1509036643658.png").targetOffset(62,-2))

wait(Pattern("1509037175703.png").similar(0.95))



