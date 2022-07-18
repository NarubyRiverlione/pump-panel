import Connection from '../../Components/Connection'
import MockTank from '../mocks/MockTank'

describe('Connection', () => {
  it('Connection has default no input nor output', () => {
    const conn = new Connection('Test connection')
    expect(conn.In).toBeNull()
    expect(conn.Out).toBeNull()
    expect(conn.Content).toBe(0)
  })

  it('Connection with tank as input has tank as content', () => {
    const mockVolume = 1235
    const mockTankContent = 568
    const mockTank = new MockTank('mock tank', mockVolume, mockTankContent)

    const conn = new Connection('Test connection')
    conn.ConnectInput(mockTank)
    expect(conn.Content).toBe(mockTank.Content)
    expect(conn.In).toMatchObject(mockTank)
    expect(conn.Out).toBeNull()
  })
  it('Disconnection tank input => connection has no content', () => {
    const mockVolume = 1235
    const mockTankContent = 568
    const mockTank = new MockTank('mock tank', mockVolume, mockTankContent)

    const conn = new Connection('Test connection')
    conn.ConnectInput(mockTank)
    conn.DisconnectInput()
    expect(conn.In).toBeNull()
    expect(conn.Content).toBe(0)
    expect(conn.Out).toBeNull()
  })
  it('Connection with tank as output has no content', () => {
    const mockVolume = 1235
    const mockTankContent = 568
    const mockTank = new MockTank('mock tank', mockVolume, mockTankContent)

    const conn = new Connection('Test connection')
    conn.ConnectOutput(mockTank)
    expect(conn.Content).toBe(0)
    expect(conn.Out).not.toBeNull()
    expect(conn.Out).toMatchObject(mockTank)
    expect(conn.In).toBeNull()
  })
  it('Disconnection tank output', () => {
    const mockVolume = 1235
    const mockTankContent = 568
    const mockTank = new MockTank('mock tank', mockVolume, mockTankContent)

    const conn = new Connection('Test connection')
    conn.ConnectOutput(mockTank)
    conn.DisconnectOutput()
    expect(conn.Out).toBeNull()
    expect(conn.Content).toBe(0)
    expect(conn.In).toBeNull()
  })
})
