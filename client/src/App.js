import {
  Avatar,
  Group,
  Text,
  TextInput,
  Stack,
  ScrollArea,
  MantineProvider,
  Button,
} from "@mantine/core";
import { IconSend } from "@tabler/icons";
import { useRef, useState } from "react";
import Message from "./components/Message";

function App() {
  const [messages, setMessages] = useState([]);
  const [isThinking, setIsThinking] = useState(false);
  const messageInputRef = useRef();

  const addMessage = (message) => {
    setMessages((current) => [...current, message]);
  };

  const sendMessage = () => {
    setIsThinking(true);

    const message = messageInputRef.current.value;
    addMessage({ message, mine: true });
    messageInputRef.current.value = "";

    fetch(`${process.env.REACT_APP_BACKEND_URL}/predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sentence: message }),
    })
      .then((res) => res.json())
      .then((pred) => {
        addMessage({ message: pred, mine: false });
        setIsThinking(false);
      });
  };

  return (
    <MantineProvider>
      <Stack style={{ height: "100vh" }}>
        <header style={{padding: 10}}>
          <Group align="flex-start">
            <Avatar
              radius="50%"
              size="lg"
              src="librarian.webp"
              alt="the librarian picture"
            />
            <div>
              <Text size="xl">The Librarian</Text>
              <Text size="sm" color="dimmed">
                {isThinking ? 'Writing...' : 'Online'}
              </Text>
            </div>
          </Group>
        </header>
        <main style={{flex: 1, padding: 10}}>
          <Stack justify="space-between" style={{height: "100%"}}>
            <ScrollArea style={{height: "80vh"}}>
              {messages.map((data, index) => (
                <Message key={index} mine={data.mine}>
                  {data.message}
                </Message>
              ))}
            </ScrollArea>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
            >
              <Group>
                <TextInput
                  aria-label="Message input"
                  placeholder="Enter a message..."
                  style={{ flex: 1 }}
                  ref={messageInputRef}
                  disabled={isThinking}
                />
                <Button type="submit" disabled={isThinking}>
                  <IconSend />
                </Button>
              </Group>
            </form>
          </Stack>
        </main>
      </Stack>
    </MantineProvider>
  );
}

export default App;
