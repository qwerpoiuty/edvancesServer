 app.directive('whiteboard', function(Socket) {
     return {
         restrict: 'E',
         scope: {
             room: '='
         },
         templateUrl: 'js/common/directives/whiteboard/whiteboard.html',
         link: function(scope, element, attrs) {
             window.whiteboard = new window.EventEmitter();
             // Ultimately, the color of our stroke;
             var color;

             // The color selection elements on the DOM.
             var colorElements = [].slice.call(document.querySelectorAll('.marker'));

             colorElements.forEach(function(el) {

                 // Set the background color of this element
                 // to its id (purple, red, blue, etc).
                 el.style.backgroundColor = el.id;

                 // Attach a click handler that will set our color variable to
                 // the elements id, remove the selected class from all colors,
                 // and then add the selected class to the clicked color.
                 el.addEventListener('click', function() {
                     color = this.id;
                     document.querySelector('.selected').classList.remove('selected');
                     this.classList.add('selected');
                 });

             });

             var canvas = document.querySelector('#paint');
             var sketch = document.querySelector('#sketch');
             var sketchStyle = getComputedStyle(sketch);

             canvas.width = 800
             canvas.height = 415

             var rect = canvas.getBoundingClientRect()
             var ctx = canvas.getContext('2d');

             ctx.lineWidth = 5;
             ctx.lineJoin = 'round';
             ctx.lineCap = 'round';

             var currentMousePosition = {
                 x: 0,
                 y: 0
             };

             var lastMousePosition = {
                 x: 0,
                 y: 0
             };

             var drawing = false;
             canvas.addEventListener('mousedown', function(e) {
                 drawing = true;
                 currentMousePosition.x = (e.pageX - rect.left) - 365
                 currentMousePosition.y = (e.pageY - rect.top) - 120
                 console.log(currentMousePosition)
             });

             canvas.addEventListener('mouseup', function() {
                 drawing = false;
             });

             canvas.addEventListener('mousemove', function(e) {

                 if (!drawing) return;

                 lastMousePosition.x = currentMousePosition.x;
                 lastMousePosition.y = currentMousePosition.y;

                 currentMousePosition.x = (e.pageX - rect.left) - 365
                 currentMousePosition.y = (e.pageY - rect.top) - 120

                 whiteboard.draw(lastMousePosition, currentMousePosition, color, true);

             });

             whiteboard.draw = function(start, end, strokeColor, shouldBroadcast) {

                 // Draw the line between the start and end positions
                 // that is colored with the given color.
                 ctx.beginPath();
                 ctx.strokeStyle = strokeColor || 'black';
                 ctx.moveTo(start.x, start.y);
                 ctx.lineTo(end.x, end.y);
                 ctx.closePath();
                 ctx.stroke();

                 // If shouldBroadcast is truthy, we will emit a draw event to listeners
                 // with the start, end and color data.
                 if (shouldBroadcast) {
                     whiteboard.emit('drawing', start, end, strokeColor || 'black');
                 }

             };
             whiteboard.on('draw', function(start, end, color) {
                 Socket.emit('drawing', start, end, color);
             });

             Socket.on('collaboratorDraw', function(start, end, color) {
                 whiteboard.draw(start, end, color);
             });
             Socket.on('erasing', function(bool) {
                 ctx.clearRect(0, 0, canvas.width, canvas.height);
             })
         }
     };
 })