import {
  ActionIcon,
  Avatar,
  Group,
  Text,
  TextInput,
  Stack,
  ScrollArea,
  MantineProvider,
  Center,
  Box,
  Button,
} from "@mantine/core";
import { IconSend } from "@tabler/icons";
import { useRef, useState } from "react";
import Message from "./components/Message";

function App() {
  const [messages, setMessages] = useState([]);
  const messageInputRef = useRef();

  const addMessage = (message) => {
    setMessages((current) => [...current, message]);
  };

  const sendMessage = () => {
    const message = messageInputRef.current.value;
    addMessage({ message, mine: true });
    messageInputRef.current.value = "";

    fetch("http://localhost:5001/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sentence: message }),
    })
      .then((res) => res.json())
      .then((pred) => {
        addMessage({ message: pred, mine: false });
      });
  };

  return (
    <MantineProvider>
      <header>
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
              Online
            </Text>
          </div>
        </Group>
      </header>
      <main>
        <Stack justify="space-between">
          <ScrollArea>
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
              />
              <Button type="submit">
                <IconSend />
              </Button>
            </Group>
          </form>
        </Stack>
      </main>
    </MantineProvider>
  );
}

export default App;
