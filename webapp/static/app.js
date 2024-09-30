// static/app.js

// Initialize ROSLIB
var ros = new ROSLIB.Ros({
    url: 'ws://localhost:9090' // Adjust if rosbridge_server is on a different host or port
  });
  
  ros.on('connection', function() {
    console.log('Connected to ROS bridge server.');
  });
  
  ros.on('error', function(error) {
    console.error('Error connecting to ROS bridge server:', error);
    displayError('Unable to connect to ROS bridge server.');
  });
  
  ros.on('close', function() {
    console.log('Connection to ROS bridge server closed.');
    displayError('Connection to ROS bridge server closed.');
  });
  
  // Subscribe to /json_queue topic
  var jsonQueueListener = new ROSLIB.Topic({
    ros: ros,
    name: '/json_queue',
    messageType: 'std_msgs/String' // Ensure this matches the publisher
  });
  
  jsonQueueListener.subscribe(function(message) {
    console.log('Received message on /json_queue:', message.data);
    try {
      var data = JSON.parse(message.data);
      var queue = data.queue;
      updateContainer(queue);
    } catch (e) {
      console.error('Failed to parse JSON:', e);
      displayError('Received invalid JSON data.');
    }
  });
  
  function updateContainer(queue) {
    var container = document.getElementById('container');
    container.innerHTML = ''; // Clear existing content
  
    queue.forEach(function(item, index) {
      var box = document.createElement('div');
      box.className = 'box';
  
      var title = document.createElement('h3');
      title.textContent = 'Action ' + (index + 1);
      box.appendChild(title);
  
      var list = document.createElement('ul');
      list.className = 'action-list';
  
      for (var key in item) {
        if (item.hasOwnProperty(key)) {
          var listItem = document.createElement('li');
          listItem.innerHTML = `<strong>${key}:</strong> ${item[key]}`;
          list.appendChild(listItem);
        }
      }
  
      box.appendChild(list);
      container.appendChild(box);
    });
  }
  
  // Optional: Display error messages in the container
  function displayError(message) {
    var container = document.getElementById('container');
    
    var errorBox = document.createElement('div');
    errorBox.className = 'error-box';
    errorBox.textContent = message;
    
    container.appendChild(errorBox);
  }
  