<template>
    <div>
        <input type="text" name="" id="" v-model="msg">
        <button @click="send">Send</button>

        <ol>
            <div v-for="text in texts" :key="text">
                <li>{{text}}</li>
            </div>
        </ol>
    </div>
</template>

<script>
export default {
    data() {
        return {
            msg: '',
            connection: null,
            texts: []
        }
    },
    methods: {
        send() {
            let data = {
                'type': 'msg',
                'message': this.msg
            }
            this.connection.send(JSON.stringify(data))
        }
    },
    created() {
        this.connection = new WebSocket('ws://localhost:5001')
        this.connection.onopen = () => {
            console.log('Connection opened')
        }
        this.connection.onmessage = (event) => {
            this.msg = ''
            console.log(event.data)
            let res = JSON.parse(event.data)
            if (res.type === "msg") {
                console.log('its a message')
            }
            this.texts.push(event.data)
        }
        this.connection.onclose = function() {
        alert("Closed websocket")
        }
    }
}
</script>