export const themeSettings = (mode) => {
    return {
      palette: {
        mode: mode,
        ...(mode === "dark"
          ? {
            primary: {
                main: '#9c27b0',
              },
              secondary: {
                main: '#9ccc65',
              },
            }
          : {
            primary: {
                main: '#9c27b0',
              },
              secondary: {
                main: '#9ccc65',
              },
            }),
      },
    };
  };