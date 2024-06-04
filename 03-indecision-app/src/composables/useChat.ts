import { sleep } from '@/helpers/sleep';
import type { ChatMessage } from '@/interfaces/chat-message.interface';
import type { YesNoMaybeResponse } from '@/interfaces/yes-no.response';
import { ref } from 'vue';

const translateAnswer = {
  yes: 'si',
  no: 'no',
  maybe: 'tal vez',
};

export const useChat = () => {
  const messages = ref<ChatMessage[]>([]);

  const onMessage = async (text: string) => {
    if (text.length === 0) return;

    messages.value.push({
      id: new Date().getTime(),
      message: text,
      itsMine: true,
    });

    if (!text.endsWith('?')) return;

    messages.value.push({
      id: new Date().getTime(),
      message: 'Cargando',
      itsMine: false,
      loading: true,
    });

    await sleep(1.5);

    const response = await getResponse();
    if (response) {
      const { answer, image } = response;
      const lastMessage = messages.value[messages.value.length - 1];
      lastMessage.image = image;
      lastMessage.message = translateAnswer[answer];
      lastMessage.loading = false;
    }
  };

  const getResponse = async () => {
    try {
      const resp = await fetch('https://yesno.wtf/api');
      const data = (await resp.json()) as YesNoMaybeResponse;
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    messages,
    onMessage,
  };
};
