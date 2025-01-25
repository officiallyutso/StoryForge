from mira_sdk import MiraClient, Flow

client = MiraClient(config={"API_KEY": "sb-b55907818667805d636940340f42d849"})

version = "0.1.0"
input_data = {
    "tone": "",
    "genre": "",
    "topic": ""
}

if version:
    flow_name = f"@shreyannarula1/story-outline-generator/{version}"
else:
    flow_name = "@shreyannarula1/story-outline-generator"

result = client.flow.execute(flow_name, input_data)
print(result["outlinestory"])