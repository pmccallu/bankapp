import Card from "./context.js";

export default function Home() {
  return (
    <Card
      bgcolor="primary"
      txtcolor="white"
      header="BadBank Landing Module"
      title="Peter Demo Bank"
      text="Welcome to the Peter Demo Bank.  You can move around using the navigation bar. 
      This is a single page application built with React to simulate an ATM application. Each account starts with $100,
      afterwards you can deposit or withdraw money or check the balance page.  All data contains a JSON list of all accounts.
        There is not a database to save account details between web sessions.
      Please do not refresh the webpage or you will need to create account again."
      body={<img src="/bank.jpeg" className="img-fluid" alt="Responsive" />}
    />
  );
}
