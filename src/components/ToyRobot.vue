<template>
  <div class="container">
    <h1 class="title">
      Toy Robot
    </h1>
    <div class="field">
      <div class="control">
        <input ref="input" class="input is-medium" v-model="command" @keyup.enter="sendCommand"/>
      </div>
    </div>
    <div class="content">
      <div class="notification" v-for="(message, index) in reversedMessages" :key="index" :class="message.type">
        {{ message.message }}
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ToyRobot',
  computed: {
    reversedMessages () { return this.messages.slice().reverse() },
    directions: () => ['NORTH', 'EAST', 'SOUTH', 'WEST'],
    validFunctions: () => ['place', 'move', 'left', 'right', 'report', 'clear', 'help']
  },
  data () {
    return {
      command: '',
      size: {
        x: 5,
        y: 5
      },
      robot: {
        facing: null,
        x: 0,
        y: 0
      },
      messages: []
    }
  },
  mounted () {
    window.addEventListener('keypress', this.focusInput)
  },
  created () {
    this.help()
  },
  methods: {
    focusInput () {
      // for every keypress focus input
      /* istanbul ignore else */
      if (this.$refs && this.$refs.input) {
        this.$refs.input.focus()
      }
    },
    sendCommand () {
      // regex to match function call
      const match = /([a-zA-Z]+)\((.*?)\)/i.exec(this.command)
      if (match !== null) {
        const trigger = match[1]
        if (this.validFunctions.includes(trigger)) {
          const parameters = match[2].split(',')
          try {
            this[trigger].apply(null, parameters.map((str) => str.trim()))
            this.addMessage(`Executed command: ${this.command}`, 'is-success')
          } catch (e) {
            this.addMessage(`Invalid command: ${this.command} (${e.message})`, 'is-warning')
          }
        } else {
          this.addMessage(`Invalid command: ${this.command}`, 'is-danger')
        }
      } else {
        this.addMessage(`Invalid input, try: help()`, 'is-danger')
      }
      this.command = ''
    },
    place (x, y, facing) {
      this.robot.x = x
      this.robot.y = y
      this.robot.facing = this.directions.indexOf(facing)
      if (this.robot.facing === -1 ||
          this.robot.x < 0 || this.robot.x > this.size.x ||
          this.robot.y < 0 || this.robot.y > this.size.x) {
        this.robot.facing = null
        throw new Error(`Invalid facing: ${facing}`)
      }
    },
    move () {
      this.robotPlaced()
      const outsideBoundaries = () => { throw new Error('Cannot move outside boundaries') }
      switch (this.mod(this.robot.facing, 4)) {
        // NORTH
        case 0:
          if (this.robot.y >= this.size.y) {
            outsideBoundaries()
          }
          this.robot.y++
          break
        // EAST
        case 1:
          if (this.robot.x >= this.size.x) {
            outsideBoundaries()
          }
          this.robot.x++
          break
        // SOUTH
        case 2:
          if (this.robot.y <= 0) {
            outsideBoundaries()
          }
          this.robot.y--
          break
        // WEST
        case 3:
          if (this.robot.x <= 0) {
            outsideBoundaries()
          }
          this.robot.x--
          break
      }
    },
    left () {
      this.robotPlaced()
      this.robot.facing--
    },
    right () {
      this.robotPlaced()
      this.robot.facing++
    },
    report () {
      this.robotPlaced()
      const facing = this.directions[this.mod(this.robot.facing, 4)]
      this.addMessage(`Robot.x: ${this.robot.x} Robot.y: ${this.robot.y} Robot.facing: ${facing}`)
    },
    mod (n, m) {
      // define mod function to allow for negative mod
      // -1 % 4 == -1
      // mod(-1, 4) == 3
      return ((n % m) + m) % m
    },
    robotPlaced () {
      if (this.robot.facing === null) {
        throw new Error('Robot has not been placed yet, use place command')
      }
    },
    help () {
      this.addMessage(`Following commands are available:
      > help() - shows available commands
      > place(x, y, facing) - place the robot at x, y location and facing the direction provided. Facing valid values are: NORTH, EAST, SOUTH, WEST
      > move() - moves the robot 1 unit forward in the direction it's facing
      > left() - rotate left 90 degrees anti-clockwise
      > right() - rotate right 90 degrees clockwise
      > report() - outputs current robots location and direction
      > clear() - clear the messages`, 'is-info')
    },
    clear () {
      this.messages = []
      this.help()
    },
    addMessage (message, type = 'is-primary') {
      this.messages.push({
        message,
        type
      })
    }
  }
}
</script>

<style scoped>
div.notification {
  white-space: pre;
  padding: 0;
}

input {
  width: 100%;
}
</style>
