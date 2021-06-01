package capstone.TensorflowUI;

import capstone.TensorflowUI.Node.Request.CreateNodeRequest;
import capstone.TensorflowUI.Node.Response.CreateNodeResponse;
import capstone.TensorflowUI.Node.Service.NodeServiceImplementation;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class TensorflowUiApplicationTests {

	NodeServiceImplementation NodeService = new NodeServiceImplementation();
	@Test
	void contextLoads() {
	}

	@Test
	void CreateNode(){
		System.out.println("Create Node:");
		CreateNodeResponse Node1 = NodeService.CreateNode(new CreateNodeRequest(0));
		Assertions.assertEquals(0, Node1.getNode().getPosition());
	}
}
