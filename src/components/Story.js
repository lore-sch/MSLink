// User's story which displays on their profile page
import { useState } from "react";
import { Text, TextInput, ScrollView, View } from "react-native";

//Called from database
const Story = ({ isEditing }) => {
  const [story, setStory] = useState(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at ultricies felis. Proin consectetur ultrices justo, vitae feugiat lectus rutrum sed. Quisque finibus ipsum ut scelerisque aliquet. Fusce efficitur nunc ac suscipit pharetra. Aenean feugiat tellus id tortor tincidunt volutpat. Ut eget mi vel lectus posuere tristique. Nulla facilisi. Nullam interdum gravida nisl, eu viverra nisi dignissim at. Duis at justo vitae magna scelerisque tincidunt. Aliquam erat volutpat. Nullam pellentesque efficitur felis, a aliquet velit aliquet nec. Morbi congue eu mauris at bibendum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Curabitur a risus eu nisl bibendum placerat. Nam venenatis diam ut justo bibendum, eget iaculis lectus rutrum. Aenean id feugiat nisl, id placerat tortor. Morbi non orci non purus finibus sagittis. Ut vestibulum nunc at arcu finibus, vitae semper purus convallis. In non augue mauris. Nam vulputate hendrerit risus ac fermentum. Quisque facilisis sapien eros, et tincidunt justo vestibulum non. Sed efficitur feugiat est, sed ullamcorper enim dictum nec. Curabitur gravida augue non leo vulputate efficitur. Sed dictum, nunc non eleifend bibendum, tellus urna sollicitudin arcu, nec hendrerit ante enim sed justo. Cras volutpat, leo ut bibendum consequat, lacus nunc volutpat odio, vel condimentum lectus arcu eu est. Donec tincidunt dolor ac enim tristique, in laoreet urna eleifend. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Quisque sed mi pretium, luctus justo sed, rhoncus leo. In sed ex id velit laoreet semper ac quis felis. Quisque tincidunt purus at dignissim facilisis. Nam tristique bibendum massa eu ultricies. In hac habitasse platea dictumst. Cras dictum, libero vitae tempor iaculis, nunc tortor egestas enim, non lobortis diam arcu nec nisi. Cras aliquam vestibulum purus, eget scelerisque lorem bibendum eu. In fringilla gravida metus in auctor. Suspendisse a quam magna. Aliquam congue varius velit, id aliquet orci fermentum nec. Proin bibendum, ex ut gravida semper, massa tellus ultricies velit, ac consequat est orci in felis. Nulla a dignissim nisl. Integer venenatis nisi a mi lacinia lacinia. In rhoncus vulputate dui, ac congue nisl sagittis at. Praesent faucibus luctus nibh, eu faucibus nisi tristique a. Sed vehicula ligula vel tempor port"
  );

  //event handler for editing story- in profile page
  const handleStoryChange = (text) => {
    setStory(text);
  };
  return (
    <ScrollView
      style={styles.storyContainer}
      contentContainerStyle={styles.storyContent}
    >
      {isEditing ? (
        <View>
          <View style={styles.promptContainer}>
            <Text style={styles.promptText}>
              A space to share your story and MS journey. Need some inspiration?
              View our guide: Sharing your journey
            </Text>
          </View>
          <TextInput
            style={styles.editStory}
            multiline={true}
            value={story}
            onChangeText={handleStoryChange}
          />
        </View>
      ) : (
        <Text style={styles.storyText}>{story}</Text>
      )}
    </ScrollView>
  );
};

const styles = {
  editStory: {
    fontSize: 17,
    textAlign: "center",
    marginHorizontal: 15,
  },
  storyText: {
    fontSize: 17,
    textAlign: "center",
    marginHorizontal: 15,
  },
  storyContainer: {
    width: 380,
    height: 200,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "white",
    marginVertical: 20,
  },
  storyContent: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  promptContainer: {
    width: 280,
    marginHorizontal: 50,
    paddingBottom: 30,
  },
  promptText: {
    fontSize: 17,
    color: "deepskyblue",
  },
};

export default Story;
