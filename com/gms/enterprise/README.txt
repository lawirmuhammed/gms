###############################
Project was generated using following mvn command:
###############################
mvn archetype:generate -DarchetypeGroupId=org.glassfish.jersey.archetypes -DarchetypeArtifactId=jersey-quickstart-webapp -DarchetypeVersion=2.2

See bellow extract from project creation:

[INFO] Generating project in Interactive mode
[INFO] Archetype repository not defined. Using the one from [org.glassfish.jersey.archetypes:jersey-quickstart-webapp:2.22.1] found in catalog remote
Define value for property 'groupId': : com.gms.enterprise
Define value for property 'artifactId': : com.gms.enterprise
Define value for property 'version':  1.0-SNAPSHOT: :
Define value for property 'package':  com.gms.enterprise: :
Confirm properties configuration:
groupId: com.gms.enterprise
artifactId: gms-pointofsale
version: 1.0-SNAPSHOT
package: com.gms.enterprise

###############################
Setting up application context:
###############################
See https://tomcat.apache.org/tomcat-6.0-doc/deployer-howto.html and
https://tomcat.apache.org/tomcat-8.0-doc/config/context.html#Defining_a_context

For this project, go to server.xml under Server folder that is configured (via add server in debug mode) and set the path="/desiredContextName"



