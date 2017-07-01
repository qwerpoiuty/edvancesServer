app.directive('chat', function(Socket) {

    return {
        restrict: 'E',
        scope: {
            title: '=',
            user: '='
        },
        templateUrl: 'js/common/directives/chat/chat.html',
        link: function(scope) {
            scope.chats = []
            Socket.on('')
            scope.sendChat = (message) => {
                var chat = {
                    message: message,
                    sender: {
                        name: (scope.user.firstName),
                        profilePic: scope.user.profilePic
                    },
                    time: Date.now()
                }
                scope.message = null
                Socket.emit('chat', chat)
            }
            Socket.on('message incoming', (message) => {
                scope.chats.push(message)
                document.getElementById('chat-history').scrollTop = document.getElementById('chat-history').scrollHeight - 500
            })

        }

    };

});