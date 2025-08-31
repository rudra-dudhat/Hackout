from flask import jsonify

current_sensor_data = {}

def showcase_loop():
    global current_sensor_data
    # ...existing code...
    for i, row in enumerate(reader):
        # ...existing code...
        current_sensor_data = row  # Save current row
        # ...existing code...

@app.route('/live_sensor', methods=['GET'])
def live_sensor():
    global current_sensor_data
    return jsonify(current_sensor_data)