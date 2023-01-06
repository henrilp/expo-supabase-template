export const treatError = (error: any) => {
  if (error instanceof Error) {
    console.log(error.message);
    alert(error.message);
  } else if (error) {
    console.log(error);
    alert(error);
  }
};
