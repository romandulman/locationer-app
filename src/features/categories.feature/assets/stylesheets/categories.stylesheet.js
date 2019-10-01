export const styles = theme => ({
  rootToolbarDiv: {
    margin: "auto",
    width: "fit-content",
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.secondary
  },
  listBox: {
    margin: "auto",
    maxWidth: 250,
    background: "white",
    borderStyle:'groove',
    borderWidth:'1px'
  },
  listBoxDiv: {
    background: "#f5f5f5",
    padding: 20
  },
  listItem: {
    textAlign: "center"
  },
  title: {
    marginTop: 30,
    textAlign: "center",
    fontFamily: "Roboto"
  },
  menuButton: {
    marginBottom: 11
  }
});
