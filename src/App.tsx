import { useState } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { View, Panel, PanelHeader, Button, Group, Div, Text } from '@vkontakte/vkui';

const App = () => {
    const [selectedTag, setSelectedTag] = useState<string | null>(null);

    // Функция выбора тега
    const handleSelectTag = async (tag: string) => {
        setSelectedTag(tag);

        try {
            // Отправка выбранного поста в стену
            await bridge.send("VKWebAppShowWallPostBox", {
                message: `Мой новый пост! ${tag}`,
            });
        } catch (error) {
            console.error("Ошибка публикации:", error);
        }
    };

    return (
        <View activePanel="main">
            <Panel id="main">
                <PanelHeader>Выбор категории</PanelHeader>
                <Group>
                    <Div>
                        <Button size="l" stretched onClick={() => handleSelectTag("#спорт")}>
                            Спорт
                        </Button>
                    </Div>
                    <Div>
                        <Button size="l" stretched onClick={() => handleSelectTag("#музыка")}>
                            Музыка
                        </Button>
                    </Div>
                    <Div>
                        <Button size="l" stretched onClick={() => handleSelectTag("#новости")}>
                            Новости
                        </Button>
                    </Div>
                    {selectedTag && (
                        <Div>
                            <Text weight="2">Вы выбрали тег: {selectedTag}</Text>
                        </Div>
                    )}
                </Group>
            </Panel>
        </View>
    );
};

export { App };
