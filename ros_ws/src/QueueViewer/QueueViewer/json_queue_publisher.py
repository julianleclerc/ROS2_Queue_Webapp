import rclpy
from rclpy.node import Node
from std_msgs.msg import String
import json

class JsonQueuePublisher(Node):
    def __init__(self):
        super().__init__('json_queue_publisher')
        self.publisher_ = self.create_publisher(String, '/json_queue', 10)
        timer_period = 1  # seconds
        self.timer = self.create_timer(timer_period, self.timer_callback)
        self.get_logger().info('JsonQueuePublisher node has been started.')

    def timer_callback(self):
        data = {
            "queue": [
                {"main_action_1": "aaa", "secondary_action_1": "bbb", "secondary_action_2": "ccc"},
                {"main_action_2": "ddd", "secondary_action_1": "eee"},
                {"main_action_3": "fff", "secondary_action_1": "ggg", "secondary_action_2": "iii"},
            ]
        }
        json_str = json.dumps(data)
        msg = String()
        msg.data = json_str
        self.publisher_.publish(msg)
        self.get_logger().info(f'Published: {json_str}')

def main(args=None):
    rclpy.init(args=args)
    node = JsonQueuePublisher()
    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        pass
    finally:
        node.destroy_node()
        rclpy.shutdown()

if __name__ == '__main__':
    main()
