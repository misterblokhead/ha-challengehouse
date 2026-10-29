# Phone files

## Android: the Automate flow

`challengehouse-upload.flo` is a flow for [Automate](https://llamalab.com/automate/). When a recording is saved
(for example by OpenTracks, with instant GPX export switched on), it posts the file to your ChallengeHouse webhook
and tries again if the upload fails.

1. Install OpenTracks (F-Droid) and Automate on the phone.
2. In OpenTracks, switch on the instant GPX export to the folder `Documents/OpenTracks` (the folder the flow
   watches; change the flow's file monitor block if you pick another one).
3. Copy the flow file to the phone and import it in Automate.
4. Open the flow, tap the HTTP request block and paste your webhook URL as its URL: the one from the ChallengeHouse
   page in the sidebar, under "Connect your phone".
5. Start the flow and allow the permissions Automate asks for.

The flow file holds nothing personal: its URL is empty until you paste yours.

## iPhone

No file is needed. The ChallengeHouse page in the sidebar shows the steps (Health Exporter & Shortcuts and two personal
automations), under "Connect your phone".
