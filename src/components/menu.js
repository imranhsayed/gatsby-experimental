import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import { Menu, Button, Grid, Box } from "@chakra-ui/core"
import { normalizePath } from "../utils/get-url-path"

export default () => {
  const { wpMenu } = useStaticQuery(graphql`
    {
      wpMenu(slug: { eq: "primary-menu" }) {
        name
        menuItems {
          nodes {
            label
            url
            connectedObject {
              ... on WpContentNode {
                uri
              }
            }
          }
        }
      }
    }
  `)

  return !!wpMenu && !!wpMenu.menuItems && !!wpMenu.menuItems.nodes ? (
    <Box mb={10}>
      <Menu>
        <Grid autoFlow="column">
          {wpMenu.menuItems.nodes.map((menuItem, i) => {
            const path = menuItem?.connectedObject?.uri ?? menuItem.url

            return (
              <Link key={i + menuItem.url} style={{ display: `block` }} to={normalizePath(path)}>
                <Button w="100%" as={Button}>
                  {menuItem.label}
                </Button>
              </Link>
            )
          })}
        </Grid>
      </Menu>
    </Box>
  ) : null
}
