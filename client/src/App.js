import {
  ActionIcon,
  Avatar,
  Group,
  Text,
  TextInput,
  Stack,
  ScrollArea
} from "@mantine/core";
import { IconSend } from "@tabler/icons";
import { useRef, useState } from "react";

function App() {
  const [messages, setMessages] = useState([]);
  const messageInputRef = useRef();

  const addMessage = (message) => {
    setMessages([...messages, message]);
  };

  const sendMessage = () => {
    const message = messageInputRef.current.value;
    addMessage(message);
    messageInputRef.current.value = "";
  }

  return (
    <>
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
            {
              messages && messages.map((message, index) => (
                <div key={index}>{message}</div>
              ))
            }
          </ScrollArea>
          <Group>
            <TextInput
              aria-label="Message input"
              placeholder="Enter a message..."
              style={{flex: 1}}
              ref={messageInputRef}
            />
            <ActionIcon onClick={() => sendMessage()}>
              <IconSend />
            </ActionIcon>
          </Group>
        </Stack>
      </main>
    </>
  );
}

export default App;
