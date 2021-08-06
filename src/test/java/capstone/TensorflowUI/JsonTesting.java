package capstone.TensorflowUI;


public class JsonTesting extends TensorflowUiIntegrationTests {

    public void createNode()  { //throws JsonProcessingException

    int id = 1;

    String jsonData = "{"
            +"\"id\" : \""
            +id
            +"\","
            +"\"input\" : "
            +"\" \","
            +"\"output\" : "
            +"\" \","
            +"\"action\" : ["
            //list of node
            +"\" \"]"
            +"}";
    }
}
