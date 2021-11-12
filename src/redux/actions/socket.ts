// @flow
export const updateSocketState = (
  connection: boolean,
  error: string | null,
) => ({
  type: 'UPDATE_SOCKET_STATE',
  data: {
    connection,
    error,
  },
});
