package capstone.TensorflowUI;

import capstone.TensorflowUI.Node.Request.CreateNodeRequest;
import capstone.TensorflowUI.Node.Response.CreateNodeResponse;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.junit.jupiter.api.Test;
import com.fasterxml.jackson.databind.ObjectMapper;

public class JsonTesting extends TensorflowUiApplicationTests {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Test
    public void createNodeTest() throws JsonProcessingException {
        CreateNodeRequest createNodeRequest = new CreateNodeRequest(0);
        CreateNodeResponse createNodeResponse = NodeService.CreateNode(createNodeRequest);

        String jsonString = objectMapper.writeValueAsString(createNodeResponse);

        System.out.println(jsonString);
    }
}
