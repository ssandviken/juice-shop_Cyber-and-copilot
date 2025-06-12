# Create validation method from comment
context: address-create.component.ts 

    // Validate user input to prevent injection attacks

# Make it explain
context: address-create.component.ts 

    Write an explanation for the active selection as paragraphs of text.

# Review current and help me improve security

context: address-create.component.ts

Promts:

    Review current document to help me improve security and make sure to follow OWASP secure coding best practices

Follow up prompts:

    Prepare Input Validation and Sanitization methods so that I can insert it into the current document

    Validate the security in the selected method and how well it will work, sanitizing the input

    Improve the sanitizeInput method based on the last feedback


# Analyze the API Code

context: @workspace

    The save method in address-create.component.ts uses addressService to save the data to the API. The API is also defined in current workspace. Find out where it is located and also give me a analyze of how security the API code is.


# Create custom fuzz test

    Write a fuzz test script in javascript using axios and @faker-js/faker. It will run in a folder of type “module”, so modules must be imported using “import” 
    It should test the endpoints defined in server.ts that have a handler function. Multiple of the  endpoints are missing a handler function, so they don't do anything.
    So first analyse the server.ts file to find the endpoints that have a handlerfunction defined. Next create fuzz tests for these endpoints using random data and injection payloads.
    Return feedback and a summary

# Agentic AI 
**Run Fuzz test**

    If not already running, start the Juice shop container using the command:
    docker run --rm -v "$PWD\\logs:/juice-shop/logs" -p 127.0.0.1:3000:3000 bkimminich/juice-shop
    Wait for it to start before running the fuzz-test-3js script
    When script is finished, perform a analyze the "access.log" available from the logs folder and look for signs of cyber attacks. Make a summary of the findings

# Run Security Testing Tools
**Use Copilot to set up a scan using ZAP**

I need a docker command that runs ZAP full scan on the juice shop using the image zaproxy/zap-stable

This prompt will return this:

    docker run --rm -t -v "%cd%\\zap:/zap/wrk" zaproxy/zap-stable zap-full-scan.py -t http://host.docker.internal:3000 -r zap-full-report.html

The command below is running the "zap-baseline.py" script instead of the "zap-full-scan.py" script. The full scan will run for a long time and doesn't go well with demos.

The baseline-scan is a time limited spider which reports issues found passively. The full-scan is a full spider, optional ajax spider and active scan which reports issues found actively and passively 

    docker run --rm -t -v "$(PWD)\\zap:/zap/wrk" zaproxy/zap-stable zap-baseline.py -t http://host.docker.internal:3000 -r zap-report.html 



**Agent**

    Start the Juice shop container using the command:
    docker run --rm -v "$PWD\logs:/juice-shop/logs" -p 127.0.0.1:3000:3000 bkimminich/juice-shop
    Wait for it to start before running the Zaproxy test using the command:
    Zaproxy container using the command docker run --rm -t -v "$(PWD)\\zap:/zap/wrk" zaproxy/zap-stable zap-baseline.py -t http://host.docker.internal:3000 -r zap-report.html 
    Lastly analyze the zap-report.html and give me a brief overview




# Analyze server log in 365

Upload a logfile to Copilot and ask it to analyze the file.

    Analyze the attached log and give me a report any indication of possible hacking attempts: generated-server.log.txt

*The logfile is available in the presentation folder.*

