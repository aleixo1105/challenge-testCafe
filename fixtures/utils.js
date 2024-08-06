import { v4 as uuidv4 } from 'uuid';

export function generateRandomName() {
    return `device-${uuidv4()}`;
}
