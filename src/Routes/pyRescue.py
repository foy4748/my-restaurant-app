import os

files = os.listdir("./")


for file in files:
    if(file[-3:] == ".js"):
        print()
        os.rename("./"+ file, "./" + os.path.splitext(file)[0] + ".jsx");
