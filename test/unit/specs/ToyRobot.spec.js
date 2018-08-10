import ToyRobot from '@/components/ToyRobot'
import { shallowMount } from '@vue/test-utils'

describe('ToyRobot.vue', () => {
  it('has correct name', () => {
    expect(ToyRobot.name).toEqual('ToyRobot')
  })

  it('should have a data with command, size, robot and messages', () => {
    const defaultData = ToyRobot.data()
    expect(defaultData).toMatchObject({
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
    })
  })

  it('should call this.help() when created', () => {
    ToyRobot.help = jest.fn()
    ToyRobot.created()
    expect(ToyRobot.help).toBeCalled()
    ToyRobot.help.mockReset()
  })

  it('should call addEventListener to keypress when mounted', () => {
    window.addEventListener = jest.fn()
    ToyRobot.mounted()
    expect(window.addEventListener).toBeCalledWith('keypress', ToyRobot.focusInput)
    window.addEventListener.mockReset()
  })

  describe('instance', () => {
    let wrapper

    beforeEach(() => {
      wrapper = shallowMount(ToyRobot)
    })

    it('should execute the sample test correctly', () => {
      wrapper.vm.command = `place(0, 0, NORTH)`
      wrapper.vm.sendCommand()
      expect(wrapper.vm.reversedMessages[0].message).toEqual(`Executed command: place(0, 0, NORTH)`)
      wrapper.vm.command = `move()`
      wrapper.vm.sendCommand()
      expect(wrapper.vm.reversedMessages[0].message).toEqual(`Executed command: move()`)
      wrapper.vm.command = `report()`
      wrapper.vm.sendCommand()
      expect(wrapper.vm.reversedMessages[0].message).toEqual(`Executed command: report()`)
      expect(wrapper.vm.reversedMessages[1].message).toEqual('Robot.x: 0 Robot.y: 1 Robot.facing: NORTH')

      wrapper.vm.command = `place(0, 0, NORTH)`
      wrapper.vm.sendCommand()
      expect(wrapper.vm.reversedMessages[0].message).toEqual(`Executed command: place(0, 0, NORTH)`)
      wrapper.vm.command = `left()`
      wrapper.vm.sendCommand()
      expect(wrapper.vm.reversedMessages[0].message).toEqual(`Executed command: left()`)
      wrapper.vm.command = `report()`
      wrapper.vm.sendCommand()
      expect(wrapper.vm.reversedMessages[0].message).toEqual(`Executed command: report()`)
      expect(wrapper.vm.reversedMessages[1].message).toEqual('Robot.x: 0 Robot.y: 0 Robot.facing: WEST')

      wrapper.vm.command = `place(1, 2, EAST)`
      wrapper.vm.sendCommand()
      expect(wrapper.vm.reversedMessages[0].message).toEqual(`Executed command: place(1, 2, EAST)`)
      wrapper.vm.command = `move()`
      wrapper.vm.sendCommand()
      expect(wrapper.vm.reversedMessages[0].message).toEqual(`Executed command: move()`)
      wrapper.vm.command = `move()`
      wrapper.vm.sendCommand()
      expect(wrapper.vm.reversedMessages[0].message).toEqual(`Executed command: move()`)
      wrapper.vm.command = `left()`
      wrapper.vm.sendCommand()
      expect(wrapper.vm.reversedMessages[0].message).toEqual(`Executed command: left()`)
      wrapper.vm.command = `move()`
      wrapper.vm.sendCommand()
      expect(wrapper.vm.reversedMessages[0].message).toEqual(`Executed command: move()`)
      wrapper.vm.command = `report()`
      wrapper.vm.sendCommand()
      expect(wrapper.vm.reversedMessages[0].message).toEqual(`Executed command: report()`)
      expect(wrapper.vm.reversedMessages[1].message).toEqual('Robot.x: 3 Robot.y: 3 Robot.facing: NORTH')
    })

    describe('computed', () => {
      describe('reversedMessaged', () => {
        it('should reverse this.messages', () => {
          wrapper.setData({ messages: ['foo', 'bar'] })
          expect(wrapper.vm.reversedMessages).toEqual(['bar', 'foo'])
        })
      })
      describe('directions', () => {
        it('should return NORTH, EAST, SOUTH, WEST', () => {
          expect(wrapper.vm.directions).toEqual(['NORTH', 'EAST', 'SOUTH', 'WEST'])
        })
      })
      describe('validFunctions', () => {
        it('should return place, move, left, right, report, clear, help', () => {
          expect(wrapper.vm.validFunctions).toEqual(['place', 'move', 'left', 'right', 'report', 'clear', 'help'])
        })
      })
    })

    describe('methods', () => {
      describe('focusInput', () => {
        it('should exist', () => {
          expect(wrapper.vm.focusInput).toBeDefined()
        })
        it('should focus on input', () => {
          wrapper.vm.focusInput()
          expect(wrapper.find('input').element).toEqual(document.activeElement)
        })
      })

      describe('mod', () => {
        it('should exist', () => {
          expect(wrapper.vm.mod).toBeDefined()
        })
        it('should return correct mod on positive number', () => {
          expect(wrapper.vm.mod(3, 4)).toEqual(3)
        })
        it('should return correct mod on negative number', () => {
          expect(wrapper.vm.mod(-1, 4)).toEqual(3)
        })
      })

      describe('robotPlaced', () => {
        it('should exist', () => {
          expect(wrapper.vm.robotPlaced).toBeDefined()
        })
        it('should throw Error if this.robot.facing === null', () => {
          expect(() => {
            wrapper.vm.robotPlaced()
          }).toThrow()
        })
        it('should NOT throw Error if this.robot.facing !== null', () => {
          wrapper.setData({ robot: { facing: 1 } })
          expect(() => {
            wrapper.vm.robotPlaced()
          }).not.toThrow()
        })
      })

      describe('clear', () => {
        it('should exist', () => {
          expect(wrapper.vm.clear).toBeDefined()
        })
        it('should clear messages and call this.help()', () => {
          wrapper.setData({ messages: ['foo'] })
          wrapper.vm.help = jest.fn()
          wrapper.vm.clear()
          expect(wrapper.vm.messages).toEqual([])
          expect(wrapper.vm.help).toHaveBeenCalled()
        })
      })

      describe('addMessage', () => {
        it('should exist', () => {
          expect(wrapper.vm.addMessage).toBeDefined()
        })
        it('should add message with default type is-primary', () => {
          wrapper.setData({ messages: [] })
          wrapper.vm.addMessage('foo')
          expect(wrapper.vm.messages).toEqual([{
            message: 'foo',
            type: 'is-primary'
          }])
        })
        it('should add message and type', () => {
          wrapper.setData({ messages: [] })
          wrapper.vm.addMessage('foo', 'bar')
          expect(wrapper.vm.messages).toEqual([{
            message: 'foo',
            type: 'bar'
          }])
        })
      })

      describe('help', () => {
        it('should exist', () => {
          expect(wrapper.vm.help).toBeDefined()
        })
        it('should call this.addMessage', () => {
          wrapper.vm.addMessage = jest.fn()
          wrapper.vm.help()
          expect(wrapper.vm.addMessage).toHaveBeenCalled()
        })
      })

      describe('report', () => {
        it('should exist', () => {
          expect(wrapper.vm.report).toBeDefined()
        })
        it('should call this.robotPlaced(), calculate which direction to return and this.addMessage the prroper output', () => {
          wrapper.setData({
            robot: {
              x: 1,
              y: 2,
              facing: 3
            }
          })
          wrapper.vm.robotPlaced = jest.fn()
          wrapper.vm.addMessage = jest.fn()
          wrapper.vm.mod = jest.fn()
          wrapper.vm.mod.mockReturnValue(3)
          wrapper.vm.report()
          expect(wrapper.vm.robotPlaced).toHaveBeenCalled()
          expect(wrapper.vm.mod).toHaveBeenCalledWith(3, 4)
          expect(wrapper.vm.addMessage).toHaveBeenCalledWith(`Robot.x: 1 Robot.y: 2 Robot.facing: WEST`)
        })
      })

      describe('right', () => {
        it('should exist', () => {
          expect(wrapper.vm.right).toBeDefined()
        })
        it('should call this.robotPlaced() and increment facing', () => {
          wrapper.setData({
            robot: {
              x: 1,
              y: 2,
              facing: 3
            }
          })
          wrapper.vm.robotPlaced = jest.fn()
          wrapper.vm.right()
          expect(wrapper.vm.robotPlaced).toHaveBeenCalled()
          expect(wrapper.vm.robot.facing).toEqual(4)
        })
      })

      describe('left', () => {
        it('should exist', () => {
          expect(wrapper.vm.left).toBeDefined()
        })
        it('should call this.robotPlaced() and decrement facing', () => {
          wrapper.setData({
            robot: {
              x: 1,
              y: 2,
              facing: 3
            }
          })
          wrapper.vm.robotPlaced = jest.fn()
          wrapper.vm.left()
          expect(wrapper.vm.robotPlaced).toHaveBeenCalled()
          expect(wrapper.vm.robot.facing).toEqual(2)
        })
      })

      describe('move', () => {
        beforeEach(() => {
          wrapper.vm.size = {
            x: 5,
            y: 5
          }
        })

        it('should exist', () => {
          expect(wrapper.vm.move).toBeDefined()
        })
        it('should call this.robotPlaced()', () => {
          wrapper.setData({
            robot: {
              x: 1,
              y: 2,
              facing: 0
            }
          })
          wrapper.vm.robotPlaced = jest.fn()
          wrapper.vm.move()
        })

        describe('NORTH', () => {
          it('should move within boundaries', () => {
            wrapper.setData({
              robot: {
                x: 1,
                y: 2,
                facing: 0
              }
            })
            wrapper.vm.move()
            expect(wrapper.vm.robot).toEqual({
              x: 1,
              y: 3,
              facing: 0
            })
          })
          it('should NOT move outside boundaries', () => {
            wrapper.setData({
              robot: {
                x: wrapper.vm.size.x,
                y: wrapper.vm.size.y,
                facing: 0
              }
            })
            expect(() => {
              wrapper.vm.move()
            }).toThrow()
          })
        })

        describe('EAST', () => {
          it('should move within boundaries', () => {
            wrapper.setData({
              robot: {
                x: 1,
                y: 2,
                facing: 1
              }
            })
            wrapper.vm.move()
            expect(wrapper.vm.robot).toEqual({
              x: 2,
              y: 2,
              facing: 1
            })
          })
          it('should NOT move outside boundaries', () => {
            wrapper.setData({
              robot: {
                x: wrapper.vm.size.x,
                y: wrapper.vm.size.y,
                facing: 1
              }
            })
            expect(() => {
              wrapper.vm.move()
            }).toThrow()
          })
        })

        describe('SOUTH', () => {
          it('should move within boundaries', () => {
            wrapper.setData({
              robot: {
                x: 1,
                y: 2,
                facing: 2
              }
            })
            wrapper.vm.move()
            expect(wrapper.vm.robot).toEqual({
              x: 1,
              y: 1,
              facing: 2
            })
          })
          it('should NOT move outside boundaries', () => {
            wrapper.setData({
              robot: {
                x: 0,
                y: 0,
                facing: 2
              }
            })
            expect(() => {
              wrapper.vm.move()
            }).toThrow()
          })
        })

        describe('WEST', () => {
          it('should move within boundaries', () => {
            wrapper.setData({
              robot: {
                x: 1,
                y: 2,
                facing: 3
              }
            })
            wrapper.vm.move()
            expect(wrapper.vm.robot).toEqual({
              x: 0,
              y: 2,
              facing: 3
            })
          })
          it('should NOT move outside boundaries', () => {
            wrapper.setData({
              robot: {
                x: 0,
                y: 0,
                facing: 3
              }
            })
            expect(() => {
              wrapper.vm.move()
            }).toThrow()
          })
        })
      })

      describe('place', () => {
        it('should exist', () => {
          expect(wrapper.vm.place).toBeDefined()
        })
        it('should set robot.x, robot.y and robot.facing', () => {
          wrapper.vm.place(1, 2, wrapper.vm.directions[0])
          expect(wrapper.vm.robot).toEqual({
            x: 1,
            y: 2,
            facing: 0
          })
        })
        it('should throw error if invalid facing', () => {
          wrapper.setData({
            robot: {
              x: 1,
              y: 2,
              facing: 3
            }
          })
          expect(() => {
            wrapper.vm.place(1, 2, 3)
          }).toThrow()
          expect(wrapper.vm.robot.facing).toBeNull()
        })
        it('should throw error if outside boundaries', () => {
          wrapper.setData({
            robot: {
              x: 1,
              y: 2,
              facing: 3
            }
          })
          expect(() => {
            wrapper.vm.place(-1, 2, 'NORTH')
          }).toThrow()
          expect(wrapper.vm.robot.facing).toBeNull()
        })
      })

      describe('sendCommand', () => {
        beforeEach(() => {
          wrapper.vm.addMessage = jest.fn()
        })

        it('should exist', () => {
          expect(wrapper.vm.sendCommand).toBeDefined()
        })
        it('should execute command and show success', () => {
          wrapper.setData({
            command: 'help()'
          })
          wrapper.vm.sendCommand()
          expect(wrapper.vm.addMessage).toBeCalledWith('Executed command: help()', 'is-success')
          expect(wrapper.vm.command).toEqual('')
        })
        it('should show invalid input if it doesnt match a function input like', () => {
          wrapper.setData({
            command: 'foobar'
          })
          wrapper.vm.sendCommand()
          expect(wrapper.vm.addMessage).toBeCalledWith('Invalid input, try: help()', 'is-danger')
          expect(wrapper.vm.command).toEqual('')
        })
        it('should show invalid command if command is function but not within this.validFunctions', () => {
          wrapper.setData({
            command: 'test()'
          })
          wrapper.vm.sendCommand()
          expect(wrapper.vm.addMessage).toBeCalledWith('Invalid command: test()', 'is-danger')
          expect(wrapper.vm.command).toEqual('')
        })
        it('should show invalid command if command if exception thrown when calling valid function', () => {
          wrapper.vm.help = jest.fn()
          wrapper.vm.help.mockImplementation(() => {
            throw new Error('foobar')
          })
          wrapper.setData({
            command: 'help()'
          })
          wrapper.vm.sendCommand()
          expect(wrapper.vm.addMessage).toBeCalledWith('Invalid command: help() (foobar)', 'is-warning')
          expect(wrapper.vm.command).toEqual('')
        })
      })
    })
  })
})
