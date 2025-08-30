import "../components/styles/test.css";
import { Card } from "../components/Card";
import { ButtonRed } from "../components/ButtonRed";
import { ButtonWhite } from "../components/ButtonWhite";
import { InputField } from "../components/InputField";
import { ModalHeader } from "../components/ModalHeader";
import { ButtonSidebar } from "../components/ButtonSidebar";
import { Header } from "./Header";
import { Sidebar } from "../components/Sidebar";
import { SubHeader } from "../components/SubHeader";

export function Test()
{
  return (
    <>
      <Sidebar></Sidebar>
      <Header title={"Events"}></Header>
      <main>
        <section className="active-events">
          <div className="events-subheader">
            <SubHeader title={"Active Events"}></SubHeader>
            <ButtonRed btnText={"Add Event"}></ButtonRed>
          </div>
          <div className="card-grid">
            <Card img={"/assets/images/Flood.jpg"} title={"Flood"} field1={"Kushtia Upazilla"} field2={"Date: 22282912"} field3={"Time: 928321js"}></Card>
            <Card img={"/assets/images/Flood.jpg"} title={"Flood"} field1={"Kushtia Upazilla"} field2={"Date: 22282912"} field3={"Time: 928321js"}></Card>
            <Card img={"/assets/images/Flood.jpg"} title={"Flood"} field1={"Kushtia Upazilla"} field2={"Date: 22282912"} field3={"Time: 928321js"}></Card>
            <Card img={"/assets/images/Flood.jpg"} title={"Flood"} field1={"Kushtia Upazilla"} field2={"Date: 22282912"} field3={"Time: 928321js"}></Card>
          </div>
        </section>
        <section className="past-events">
          <div className="events-subheader">
            <SubHeader title={"Past Events"}></SubHeader>
            <ButtonRed btnText={"Filter Event"}></ButtonRed>
          </div>
          <div className="card-grid">
            <Card img={"/assets/images/Flood.jpg"} title={"Flood"} field1={"Kushtia Upazilla"} field2={"Date: 22282912"} field3={"Time: 928321js"}></Card>
            <Card img={"/assets/images/Flood.jpg"} title={"Flood"} field1={"Kushtia Upazilla"} field2={"Date: 22282912"} field3={"Time: 928321js"}></Card>
            <Card img={"/assets/images/Flood.jpg"} title={"Flood"} field1={"Kushtia Upazilla"} field2={"Date: 22282912"} field3={"Time: 928321js"}></Card>
            <Card img={"/assets/images/Flood.jpg"} title={"Flood"} field1={"Kushtia Upazilla"} field2={"Date: 22282912"} field3={"Time: 928321js"}></Card>
          </div>
        </section>
      </main>
    </>
  )
}