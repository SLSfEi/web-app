import requests, time, random, argparse
SERVER_ENDPOINT = "http://127.0.0.1:8000/api/v1/scan"

arg_parser = argparse.ArgumentParser()
arg_parser.add_argument("--once", "-o", action="store_true", help="send once")
args = arg_parser.parse_args()

def gen_data():
    data = ["start_flag,angle,distance,quality"]
    cur_angle = 0
    rand_inc = random.random()
    while(cur_angle + rand_inc <= 360):
        cur_angle += rand_inc
        data.append(f"1,{cur_angle:.3f},999,999")
        rand_inc = random.random()
    return "\n".join(data)

def send_request():
    x = requests.post(SERVER_ENDPOINT,data=gen_data(),headers={"Content-Type": "text/csv"})
    print(x.text)

if(__name__ == "__main__"):
    if (args.once):
        try:
            send_request()
        except Exception as e:
            print(e)
    else:
        while(True):
            try:
                send_request()
            except Exception as e:
                print(e)
            time.sleep(0.3)

