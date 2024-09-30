import sys
if sys.prefix == '/usr':
    sys.real_prefix = sys.prefix
    sys.prefix = sys.exec_prefix = '/home/fyier/ROS2_Queue_Viewer/ros_ws/install/QueueViewer'
