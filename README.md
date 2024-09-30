# ROS2 Web Chat Interface

Basic webapp interface for ROS2 Humble for displaying a queue using ros_bridge

## Project Structure

The project is divided into two main components:

### ros_ws

Contains the ROS2 environment (using ROS Humble) and includes the following package:

#### Packages

- **QueueViewer**
  - **Description:** Implements the `json_queue_publisher` node which communicates json as a string on /json_queue topic.
  - **Location:** `ros_ws/src/QueueViewer`


### Webapp

A standard web application hosted using Flask, accessible on port `8000`.

- **Description:** Provides an interface to list the actions currently in the queue.
- **Location:** `webapp/`
- **Framework:** Flask
- **Port:** `8000`

### Json Structure

    {
        "queue": [
            {"main_action_1": "aaa", "secondary_action_1": "bbb", "secondary_action_2": "ccc"},
            {"main_action_2": "ddd", "secondary_action_1": "eee"},
            {"main_action_3": "fff", "secondary_action_1": "ggg", "secondary_action_2": "iii"},
        ]
    }


## Installation

### Prerequisites

- **ROS2 Humble:** Ensure ROS2 Humble is installed and properly set up on your system.
- **Python 3:** Required for running the Flask web application.
- **Dependencies:** Install necessary Python packages (e.g., Flask).

### Launching ROS Nodes

1. **Build the ROS Workspace:**
   ```bash
   cd ros_ws/
   colcon build
   ```

2. **Source the Setup Script:**
   ```bash
   source install/setup.bash
   ```

3. **Run the Chat Service Node:**
   ```bash
   ros2 run QueueViewer json_queue_publisher
   ```

### Starting the Web Application

1. **Launch `rosbridge`:**
   ```bash
   ros2 launch rosbridge_server rosbridge_websocket_launch.xml
   ```

2. **Start the Flask Web Application:**
   ```bash
   cd ../webapp
   python3 app.py
   ```

3. **Access the Web Interface:**
   Open your web browser and navigate to `http://localhost:8000`.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

---

by [julianleclerc](https://github.com/julianleclerc)*