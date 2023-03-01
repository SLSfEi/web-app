import requests, time, random, argparse, math, csv
SERVER_ENDPOINT = "http://127.0.0.1:8000/api/v1/scan"

arg_parser = argparse.ArgumentParser()
arg_parser.add_argument("--once", "-o", action="store_true", help="send once")
arg_parser.add_argument("--sample", "-s", action="store_true", help="send sample")
args = arg_parser.parse_args()

def gen_data():
    data = ["start_flag,x,y,angle,distance,quality"]
    cur_angle = 0
    rand_inc = random.random()
    while(cur_angle + rand_inc <= 360):
        cur_angle += rand_inc
        # distance = random.randint(5000,6000)
        distance = 6000
        x = math.cos(cur_angle) * distance
        y = -math.sin(cur_angle) * distance
        data.append(f"1,{x:.3f},{y:.3f},{cur_angle:.3f},{distance},999")
        rand_inc = random.random()
    return "\n".join(data)

def load_data(iteration):
    print("loading iteration:",iteration)
    output = ""
    with open("./scan_sample.csv","r") as file:
        reader = csv.reader(file)
        for i,line in enumerate(reader):
            #print(type(line[0]))
            if i == 0 or line[0] == str(iteration):
                output += ",".join(line[1:])+"\n"
    return output

def send_request(data):
    x = requests.post(SERVER_ENDPOINT,data=data,headers={"Content-Type": "text/csv"})
    print(x.text)

if(__name__ == "__main__"):
    if (args.once):
        try:
            if (args.sample):
                send_request(load_data(random.choice([1,33,86])))
            else:
                send_request(gen_data())
        except Exception as e:
            print(e)
    else:
        while(True):
            try:
                if (args.sample):
                    send_request(load_data(random.choice([1,33,86])))
                else:
                    send_request(gen_data())
            except Exception as e:
                print(e)
            time.sleep(0.3)

