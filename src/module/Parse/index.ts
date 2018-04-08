import { Methods } from '../definitions/Console'
import { Payload } from '../definitions/Payload'
import GUID from './GuidGenerator'

/**
 * Parses a console log and converts it to a special Log object
 * @argument method The console method to parse
 * @argument data The arguments passed to the console method
 */
export default function Parse(method: Methods, data: any[]): Payload | false {
  // If the method params were empty, return false
  if (data.length === 0) return false

  // Create an ID
  const id = GUID()
  // Parse the methods
  switch (method) {
    case 'clear': {
      return {
        method,
        id
      }
    }

    case 'error': {
      const errors = data.map((error) => {
        try {
          return error.message || error
        } catch (e) {
          return error
        }
      })

      return {
        method,
        id,
        data: errors
      }
    }

    default: {
      return {
        method,
        id,
        data
      }
    }
  }
}
