package capstone.TensorflowUI.Node.Model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.UUID;

public class Node {
    @JsonProperty ("nodeID")
    private final UUID nodeID;
    private String functionName;
    @JsonProperty("action")
    private String action;
    @JsonProperty("type")
    private String type; //variable - should be a class
    @JsonProperty("nodeData")
    private String nodeData;
    @JsonProperty("input")
    private String input;
    @JsonProperty("output")
    private String output;
    public Node(UUID nodeID) {
        this.nodeID = nodeID;
    }

    public UUID getNodeID(){return nodeID;}

    public void setAction(String action){
        this.action = action;
    }
    public void setInput(String input){
        this.input = input;
    }
    public void setOutput(String output){
        this.output = output;
    }
    public void setNodeData(String nodeData){
        this.nodeData = nodeData;
    }
    public void setType(String type){
        this.type = type;
    }
}
