package capstone.TensorflowUI;

import org.junit.jupiter.api.Test;

public class JsonTesting extends TensorflowUiApplicationTests {

    @Test
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
