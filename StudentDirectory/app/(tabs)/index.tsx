import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";

import StudentItem from "@/components/student-item";
import StudentDetail from "@/components/student-detail";
import SearchBar from "@/components/search-bar";

import { Student, STUDENTS } from "@/data/students";

import { useState } from "react";

export default function HomeScreen() {

  // SEARCH STATE
  const [query, setQuery] = useState<string>("");

  // SELECTED STUDENT STATE
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  // NEW: DEPARTMENT FILTER STATE
  const [departmentFilter, setDepartmentFilter] = useState<string>("All");

  // SELECT HANDLER
  const handleSelect = (student: Student) => {
    setSelectedStudent((prev) =>
      prev?.id === student.id ? null : student
    );
  };

  // UPDATED FILTER
  const filtered = STUDENTS.filter((s) => {

    // SEARCH FILTER
    const matchesQuery =
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.department.toLowerCase().includes(query.toLowerCase());

    // DEPARTMENT FILTER
    const matchesDepartment =
      departmentFilter === "All" ||
      s.department === departmentFilter;

    return matchesQuery && matchesDepartment;
  });

  return (
    <View style={styles.container}>

      {/* TITLE */}
      <View style={styles.titleBar}>
        <Text style={styles.title}>Student Directory</Text>
      </View>

      {/* NEW: FILTER TABS */}
      <View style={styles.tabContainer}>

        <TouchableOpacity
          style={[
            styles.tab,
            departmentFilter === "All" && styles.activeTab,
          ]}
          onPress={() => setDepartmentFilter("All")}
        >
          <Text
            style={[
              styles.tabText,
              departmentFilter === "All" && styles.activeTabText,
            ]}
          >
            All
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tab,
            departmentFilter === "Computer Science" &&
              styles.activeTab,
          ]}
          onPress={() =>
            setDepartmentFilter("Computer Science")
          }
        >
          <Text
            style={[
              styles.tabText,
              departmentFilter === "Computer Science" &&
                styles.activeTabText,
            ]}
          >
            Computer Science
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tab,
            departmentFilter === "Software Engineering" &&
              styles.activeTab,
          ]}
          onPress={() =>
            setDepartmentFilter("Software Engineering")
          }
        >
          <Text
            style={[
              styles.tabText,
              departmentFilter === "Software Engineering" &&
                styles.activeTabText,
            ]}
          >
            Software Engineering
          </Text>
        </TouchableOpacity>

      </View>

      {/* SEARCH BAR */}
      <SearchBar
        value={query}
        onChangeText={setQuery}
      />

      {/* LIST */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <StudentItem
            student={item}
            onPress={handleSelect}
            isSelected={selectedStudent?.id === item.id}
          />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>
              No students match {query}
            </Text>
          </View>
        }
      />

      {/* DETAIL */}
      {selectedStudent && (
        <StudentDetail student={selectedStudent} />
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F4F8",
  },

  titleBar: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "#0D1F4E",
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
  },

  // NEW TAB STYLES
  tabContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
    gap: 8,
  },

  tab: {
    backgroundColor: "#E2E8F0",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },

  activeTab: {
    backgroundColor: "#2563EB",
  },

  tabText: {
    fontSize: 12,
    color: "#334155",
    fontWeight: "600",
  },

  activeTabText: {
    color: "#FFFFFF",
  },

  empty: {
    padding: 40,
    alignItems: "center",
  },

  emptyText: {
    fontSize: 14,
    color: "#94A3B8",
  },
});