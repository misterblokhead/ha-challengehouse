# Phone files

## Android: the Automate flow

`challengehouse-upload.flo` is a flow for [Automate](https://llamalab.com/automate/). When a recording is saved
(for example by OpenTracks, with instant GPX export switched on), it posts the file to your ChallengeHouse webhook
and tries again if the upload fails.

1. Install OpenTracks (F-Droid) and Automate on the phone.
2. In OpenTracks, switch on the instant GPX export and pick a folder.
3. Copy the flow file to the phone and open it in Automate (or use Automate's import). Automate asks for the
   webhook URL: paste the one from the ChallengeHouse page in the sidebar, under "Connect your phone".
4. Start the flow and allow the permissions Automate asks for.

The flow file holds nothing personal: the URL is typed in when you import it.

## iPhone

No file is needed. The ChallengeHouse page in the sidebar shows the steps (Health Exporter & Shortcuts and two personal
automations), under "Connect your phone".
