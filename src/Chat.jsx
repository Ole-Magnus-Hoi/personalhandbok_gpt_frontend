import "@navikt/ds-css";
import "@navikt/ds-css-internal"; // <- Må settes etter ds-css
import { Chat } from "@navikt/ds-react";
import { PeopleFilled, Service } from "@navikt/ds-icons";

function Chatting({history}) {
    return (
        history.slice(0).reverse().map((p, index) => {
            return <div className="grid gap-10">
              <Chat 
                position="left"
                avatar={<PeopleFilled />}
                avatarBgColor="#fff"
                backgroundColor="#333"
              >
                <Chat.Bubble>{p.question}</Chat.Bubble>
              </Chat>
              <Chat
                position="right"
                avatar={<Service />}
                avatarBgColor="#fff"
                backgroundColor="#1231c9"
              >
                <Chat.Bubble>{p.answer}</Chat.Bubble>
              </Chat>
            </div>
          })
    );
  };

export default Chatting;