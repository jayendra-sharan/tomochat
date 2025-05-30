export const ADD_MEMBERS_TO_ROOM = `
  mutation AddMembersToRoom($input: AddMembersToRoomInput!) {
    addMembersToRoom(input: $input) {
      id
      name
      members {
        user {
          displayName
        }
      }
    }
  }
`;
