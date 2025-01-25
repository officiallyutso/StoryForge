from mira_sdk import MiraClient, Flow

# Initialize the client
client = MiraClient(config={"API_KEY": "sb-b55907818667805d636940340f42d849"})

version = "0.1.0"
input_data = {
    "plot": "",
    "tone": "",
    "genre": "",
    "topic": "",
    "twist": ""
}

# If no version is provided, latest version is used by default
if version:
    flow_name = f"@shreyannarula1/story-update-and-improvement-generator/{version}"
else:
    flow_name = "@shreyannarula1/story-update-and-improvement-generator"

result = client.flow.execute(flow_name, input_data)
print(result)